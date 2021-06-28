using System.Threading;
using System;
using System.Collections.Generic;
using System.Net.Cache;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : ApiController
    {

        [HttpGet]        
        public async Task<IActionResult> GetActivities(CancellationToken ct)
        {
            var result=  await Mediator.Send(new ListActivities.Query(), ct);
            return HandleResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivityById(Guid id)
        {
            var result = await Mediator.Send(new DetailActivity.Query{Id=id});   
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command{Activity=activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, [FromBody] Activity activity)
        {
            activity.Id=id;
            return Ok(await Mediator.Send(new EditActivity.Command{Activity=activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command{Id=id}));
        }

    }
}