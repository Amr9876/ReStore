namespace API.Controllers;

[AllowAnonymous]
public class FallbackController : Controller
{
    public IActionResult Index()
    {
        string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");

        return PhysicalFile(path, MediaTypeNames.Text.Html);
    }
}
