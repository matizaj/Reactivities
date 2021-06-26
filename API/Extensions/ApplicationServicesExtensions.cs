using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {    
        public static IServiceCollection AppServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers(x=> {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                x.Filters.Add(new AuthorizeFilter(policy));
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt=>{
                opt.UseSqlite(config.GetConnectionString("DevConnection"));
            });
            services.AddCors(x=> {
                x.AddPolicy("CorsPolicy", policy=>{
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(ListActivities.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }    
    }
}