using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MPS_IndependentGirls.Startup))]
namespace MPS_IndependentGirls
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
