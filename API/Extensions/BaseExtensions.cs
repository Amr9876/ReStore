namespace API.Extensions;

public static class BaseExtensions
{
    
    public static IServiceCollection AddDatabaseMigration(this IServiceCollection app) 
    {

        using var scope = app.BuildServiceProvider().CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

        try
        {
            context.Database.Migrate();            
            DbInitializer.InitializeAsync(context, userManager).Wait();
        }
        catch (Exception e)
        {
            logger.LogError(e, "An error occured while migrating the database.");
        }   

        return app;
    }

}
