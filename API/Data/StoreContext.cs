namespace API.Data;

public class StoreContext : IdentityDbContext<User>
{
    public StoreContext(DbContextOptions options) 
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    public DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole 
                { 
                    Name = Core.Roles.Member,
                    NormalizedName = Core.Roles.Member.ToUpper()
                },
                new IdentityRole 
                {
                    Name = Core.Roles.Admin,
                    NormalizedName = Core.Roles.Admin.ToUpper()
                }
            );
    }

}
