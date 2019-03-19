# Generated by binpac_quickstart


refine flow OPCUA_Flow += {
	function proc_opcua_message(msg: OPCUA_PDU): bool
		%{
		BifEvent::generate_opcua_event(connection()->bro_analyzer(), connection()->bro_analyzer()->Conn());
		return true;
		%}
};

refine typeattr OPCUA_PDU += &let {
	proc: bool = $context.flow.proc_opcua_message(this);
};