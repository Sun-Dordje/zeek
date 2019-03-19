// Generated by binpac_quickstart

#include "plugin/Plugin.h"

#include "OPCUA.h"

namespace plugin {
namespace Bro_OPCUA {

class Plugin : public plugin::Plugin {
public:
	plugin::Configuration Configure()
		{
		AddComponent(new ::analyzer::Component("OPCUA",
		             ::analyzer::OPCUA::OPCUA_Analyzer::InstantiateAnalyzer));

		plugin::Configuration config;
		config.name = "Bro::OPCUA";
		config.description = "OPC Unified Architecture analyzer";
		return config;
		}
} plugin;

}
}