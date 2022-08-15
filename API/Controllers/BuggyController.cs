namespace API.Controllers;

public class BuggyController : ApiController
{
    [HttpGet("not-found")]
    public ActionResult GetNotFound()
    {
        return NotFound();
    }    
    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
        return BadRequest(new ProblemDetails { Title = "this is a bad request" });
    }    

    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorized()
    {
        return Unauthorized();
    }   

    [HttpGet("validation-error")]
    public ActionResult GetValidationError()
    {
        ModelState.AddModelError("Problem1", "This is a validation error");
        ModelState.AddModelError("Problem2", "This is another validation error");
        return ValidationProblem();
    }    

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
        throw new Exception("this is a server error");
    }
}
