namespace API.Controllers;

public class AccountController : ApiController
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    private readonly StoreContext _context;
 
    public AccountController(UserManager<User> userManager, 
                             TokenService tokenService,
                             StoreContext context)
    {
        _context = context;
        _tokenService = tokenService;
        _userManager = userManager;       
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) 
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);

        if (user is null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized();

        var userBasket = await RetreiveBasketAsync(loginDto.Username);
        var anonBasket = await RetreiveBasketAsync(Request.Cookies["buyerId"]);

        if (anonBasket is not null) 
        {
            if (userBasket is not null) 
                _context.Baskets.Remove(userBasket);

            anonBasket.BuyerId = user.UserName;
            Response.Cookies.Delete("buyerId");

            await _context.SaveChangesAsync();
        }

        return new UserDto 
        {
            Email = user.Email,
            Token = await _tokenService.GenerateTokenAsync(user),
            Basket = anonBasket is not null ? anonBasket.MapBasketToDto() : userBasket?.MapBasketToDto()
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto) 
    {
        var user = new User 
        {
            UserName = registerDto.Username,
            Email = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);                
            }

            return ValidationProblem();            
        }

        await _userManager.AddToRoleAsync(user, Roles.Member);

        return StatusCode(201);
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        var userBasket = await RetreiveBasketAsync(User.Identity.Name);

        return new UserDto 
        {
            Email = user.Email,
            Token = await _tokenService.GenerateTokenAsync(user),
            Basket = userBasket?.MapBasketToDto()
        };
    }

    [Authorize]
    [HttpGet("savedAddress")]
    public async Task<ActionResult<UserAddress>> GetSavedAddress()
    {
        return await _userManager.Users
            .Where(x => x.UserName == User.Identity.Name)
            .Select(user => user.Address)
            .FirstOrDefaultAsync();        
    }

    private async Task<Basket> RetreiveBasketAsync(string buyerId)
    {
        if (string.IsNullOrEmpty(buyerId)) 
        {
            Response.Cookies.Delete("buyerId");
            return null;
        }

        return await _context.Baskets
                    .Include(b => b.Items)
                    .ThenInclude(bi => bi.Product)
                    .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
    }
}
