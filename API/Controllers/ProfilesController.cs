﻿using Application.Profiles;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers {
    public class ProfilesController : BaseApiController {
        [HttpGet("{username}")]
        public async Task<IActionResult> Detail(string username) {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }
    }
}
