namespace API.Controllers;

public class BasketController : ApiController
{
    private readonly StoreContext _context;

    public BasketController(StoreContext context)
    {
            _context = context;        
    }    

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetreiveBasketAsync(GetBuyerId());

        if (basket is null) return NotFound();

        return basket.MapBasketToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity) 
    {
        var basket = await RetreiveBasketAsync(GetBuyerId());

        if (basket is null) basket = CreateBasket();

        var product = await _context.Products.FindAsync(productId);

        if (product is null) return BadRequest(new ProblemDetails 
        {
            Title = "Product not found",
        });

        basket.AddItem(product, quantity);

        bool result = await _context.SaveChangesAsync() > 0; 

        if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

        return BadRequest(new ProblemDetails 
        {
            Title = "An error occurred"
        });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity) 
    {

        var basket = await RetreiveBasketAsync(GetBuyerId());

        if(basket is null) return NotFound();

        basket.RemoveItem(productId, quantity);

        bool result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest(new ProblemDetails 
        {
            Title = "An error occurred"
        });
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

    private string GetBuyerId()
    {
        return User.Identity?.Name ?? Request.Cookies["buyerId"];
    }

    private Basket CreateBasket()
    {
        var buyerId = User.Identity?.Name;

        if (string.IsNullOrEmpty(buyerId)) 
        {
            buyerId = Guid.NewGuid().ToString();
 
            var cookieOptions = new CookieOptions 
            {
                IsEssential = true,
                Expires = DateTime.Now.AddMonths(1)  
            };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        }
        

        var basket = new Basket 
        { 
            BuyerId = buyerId 
        };

        _context.Baskets.Add(basket);

        return basket;

    }
}
