using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.Extensions.Configuration;


namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BlobController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BlobController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // POST api/<BlobController>
        [HttpPost]
        public async Task<OkObjectResult> uploadAsync([FromForm] IFormFile file)
        {
            string connectionString = _configuration.GetConnectionString("joseMeza");
            string containerName = _configuration.GetValue<string>("ContainerName");
            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);

            var request = HttpContext.Request;
            var fileName = "";
            var strCategory = "";

            if (request.Form.Files.Count > 0)
            {
                fileName = request.Form.Files[0].FileName;
                var extension = fileName.Substring(fileName.LastIndexOf(".")).ToLower();
                strCategory = request.Form["category"].ToString();
            }
        
            var containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            if (!containerClient.Exists())
            {
                containerClient = await blobServiceClient.CreateBlobContainerAsync(containerName);
            }
            // Get a reference to a blob
            BlobClient blobClient = containerClient.GetBlobClient(fileName);

            Console.WriteLine("Uploading to Blob storage as blob:\n\t {0}\n", blobClient.Uri);
            Stream fs = request.Form.Files[0].OpenReadStream();

            var stream = new MemoryStream();

            stream.Position = 0;
            fs.Position = 0;
            fs.CopyTo(stream);
            stream.Position = 0;

            var info = await blobClient.UploadAsync(stream, true);
            string uri = blobClient.Uri.ToString();
            DateTime lastModifiedBlob = info.Value.LastModified.LocalDateTime;
            long size = stream.Length;
            Models.File newRecord = new Models.File();
            newRecord.Name = request.Form.Files[0].FileName;
            newRecord.LastReviewed = lastModifiedBlob;
            newRecord.Category = strCategory;
            newRecord.Uri = uri;
            newRecord.Size = size;

            using (var filePost = new HttpClient())
            { 
                
                var result = await filePost.PostAsJsonAsync("https://localhost:44381/files", newRecord);
            }
            
            return Ok("uploaded");

        }
    }
}
