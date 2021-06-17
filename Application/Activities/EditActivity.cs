using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class EditActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityFromDb = await _context.Activities.FindAsync(request.Activity.Id);

                if(activityFromDb==null) return Result<Unit>.Failure("Activity not found");

                // activity.Title = request.Activity.Title ?? activity.Title;
                _mapper.Map(request.Activity, activityFromDb);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failure with edit activity");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}