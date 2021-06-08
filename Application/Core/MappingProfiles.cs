using System.Diagnostics;
using AutoMapper;

namespace Application.Core
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<Domain.Activity, Domain.Activity>();
        }
    }
}