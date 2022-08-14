namespace API;

public static class Extensions
{
    
    public static IApplicationBuilder UseDatabaseMigration(this IApplicationBuilder app) 
    {

        using var scope = app.ApplicationServices.CreateScope();
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
