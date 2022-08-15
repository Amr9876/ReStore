namespace API;

public static class Extensions
{
    
    public static IServiceCollection AddDatabaseMigration(this IServiceCollection app) 
    {

        using var scope = app.BuildServiceProvider().CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

        try
        {
            context.Database.Migrate();            
            DbInitializer.Initialize(context);
        }
        catch (Exception e)
        {
            logger.LogError(e, "An error occured while migrating the database.");
        }   

        return app;
    }

}
