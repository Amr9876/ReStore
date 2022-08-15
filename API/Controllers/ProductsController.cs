namespace API.Controllers;

public class ProductsController : ApiController
{
    private readonly StoreContext _context;
 
    public ProductsController(StoreContext context)
    {
        _context = context;       
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        return Ok(await _context.Products.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if(product is null) return NotFound();

        return product;
    }
}
