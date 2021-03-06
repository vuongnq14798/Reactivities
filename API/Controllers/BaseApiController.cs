using API.Extensions;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase {
        private IMediator mediator;
        protected IMediator Mediator => mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        protected IActionResult HandleResult<T>(Result<T> result) {
            if (result == null)
                return NotFound();
            else if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            else if (result.IsSuccess && result.Value == null)
                return NotFound();
            else
                return BadRequest(result.Error);
        }

        protected IActionResult HandlePagedResult<T>(Result<PagedList<T>> result) {
            if (result == null)
                return NotFound();
            else if (result.IsSuccess && result.Value != null) {
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize, result.Value.TotalCount, result.Value.TotalPages);
                return Ok(result.Value);
            } else if (result.IsSuccess && result.Value == null)
                return NotFound();
            else
                return BadRequest(result.Error);
        }
    }
}