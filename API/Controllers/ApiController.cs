using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiController:ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator=>_mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}