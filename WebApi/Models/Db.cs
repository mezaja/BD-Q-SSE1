using FileContextCore;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Models
{
    public class Db : DbContext
    {
        public Db(DbContextOptions<Db> options) 
            : base(options)
        {
        }
        public DbSet<File> Files { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseFileContextDatabase();
        }
    }
}
