using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Base
    {
        [Key]
        public int Id { get; set; }
    }
}
