using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Photos {
    public class SetMain {

        public class Command : IRequest<Result<Unit>> {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor) {
                _context = context;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                var user = await _context.Users.Include(x => x.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo == null) return null;
                var currMain = user.Photos.FirstOrDefault(x => x.IsMain);
                if (currMain != null) currMain.IsMain = false;
                photo.IsMain = true;

                var result = await _context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem setting main photo");
            }
        }
    }
}
