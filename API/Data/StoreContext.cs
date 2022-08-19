namespace API.Data;

public class StoreContext : IdentityDbContext<User, Role, int>
{
    public StoreContext(DbContextOptions options) 
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    public DbSet<Basket> Baskets { get; set; }

    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>()
            .HasOne(a => a.Address)
            .WithOne()
            .HasForeignKey<UserAddress>(a => a.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Role>()
            .HasData(
                new Role 
                { 
                    Id = 1,
                    Name = Core.Roles.Member,
                    NormalizedName = Core.Roles.Member.ToUpper()
                },
                new Role 
                {
                    Id = 2, 
                    Name = Core.Roles.Admin,
                    NormalizedName = Core.Roles.Admin.ToUpper()
                }
            );
    }

}
