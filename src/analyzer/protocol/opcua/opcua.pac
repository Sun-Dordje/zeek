# Generated by binpac_quickstart

# Analyzer for OPC Unified Architecture
#  - opcua-protocol.pac: describes the OPCUA protocol messages
#  - opcua-analyzer.pac: describes the OPCUA analyzer code

%include binpac.pac
%include bro.pac

%include /home/stagiaire2019/Bureau/stage/t/zeek/src/analyzer/protocol/opcua/opcua-protocol.pac

%extern{
	#include "events.bif.h"
%}

analyzer OPCUA withcontext {
	connection: OPCUA_Conn;
	flow:       OPCUA_Flow;
};

# Our connection consists of two flows, one in each direction.
connection OPCUA_Conn(bro_analyzer: BroAnalyzer) {
	upflow   = OPCUA_Flow(true);
	downflow = OPCUA_Flow(false);
};


# Now we define the flow:
flow OPCUA_Flow(is_orig: bool) {

	# ## TODO: Determine if you want flowunit or datagram parsing:

	# Using flowunit will cause the anlayzer to buffer incremental input.
	# This is needed for &oneline and &length. If you don't need this, you'll
	# get better performance with datagram.

	# flowunit = OPCUA_PDU(is_orig) withcontext(connection, this);
	datagram = OPCUA_PDU(is_orig) withcontext(connection, this);

};
