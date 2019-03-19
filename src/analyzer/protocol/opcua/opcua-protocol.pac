# Generated by binpac_quickstart

# ## TODO: Add your protocol structures in here.
# ## some examples:

# Types are your basic building blocks.
# There are some builtins, or you can define your own.
# Here's a definition for a regular expression:
# type OPCUA_WHITESPACE = RE/[ \t]*/;

# A record is a collection of types.
# Here's one with the built-in types
# type example = record {
#
# };

let READ_REQUEST:uint32=629;
let READ_RESPONSE:uint32=632;
let SECURE_CHANNEL_REQUEST:uint32=446;
let SECURE_CHANNEL_RESPONSE:uint32=449;
let PUBLISH_REQUEST:uint32=824;
let PUBLISH_RESPONSE:uint32=827;
let CLOSE_SECURE_CHANNEL_REQUEST:uint32=450;
let CLOSE_SECURE_CHANNEL_RESPONSE:uint32=453;
let BROWSE_REQUEST:uint32=525;
let BROWSE_RESPONSE:uint32=528;
let WRITE_REQUEST:uint32=671;
let WRITE_RESPONSE:uint32=674;
let CREATE_SUBSCR_REQUEST:uint32=785;
let CREATE_SUBSCR_RESPONSE:uint32=788;
let GET_ENDPOINTS_REQUEST:uint32=428;
let GET_ENDPOINTS_RESPONSE:uint32=431;


type OPCUA_PDU(is_orig: bool) = record {
	data: bytestring &restofdata;
} &byteorder=bigendian;

type QUALIFIED_NAME() = record{
	id: uint16;
	len: uint32 &byteorder=littleendian ;
	val: case(len) of{
		0xFFFFFFFF -> e: empty ;
		0x00000000 -> f: empty ;
		default -> name : bytestring &length=len ;
	};
}

type MESSAGE() = record{
	type_id: uint8[4] &byteorder=littleendian;
	content : case (type_id[3] | (type_id[2]<<8)) of {
		SECURE_CHANNEL_REQUEST -> open_secure_channel_request: OPEN_SECURE_CHANNEL_REQUEST;
		SECURE_CHANNEL_RESPONSE -> open_secure_channel_response: OPEN_SECURE_CHANNEL_RESPONSE;
		PUBLISH_REQUEST -> publish_request: OPCUA_PUBLISH_REQUEST;
		PUBLISH_RESPONSE -> publish_response: OPCUA_PUBLISH_RESPONSE;
		CLOSE_SECURE_CHANNEL_REQUEST -> close_secure_channel_request: OPCUA_CLOSE_SECURE_CHANNEL_REQUEST;
		CLOSE_SECURE_CHANNEL_RESPONSE-> close_secure_channel_response: OPCUA_CLOSE_SECURE_CHANNEL_RESPONSE;
		BROWSE_REQUEST -> browse_request: OPCUA_BROWSE_REQUEST;
		BROWSE_RESPONSE -> browse_response: OPCUA_BROWSE_RESPONSE;
		READ_REQUEST -> read_request: OPCUA_READ_REQUEST;
		READ_RESPONSE -> read_response: OPCUA_READ_RESPONSE;
		WRITE_REQUEST -> write_request: OPCUA_WRITE_REQUEST;
		WRITE_RESPONSE -> write_response: OPCUA_WRITE_RESPONSE;
		CREATE_SUBSCR_REQUEST -> subscription_request: OPCUA_CREATE_SUBSCR_REQUEST;
		CREATE_SUBSCR_RESPONSE -> subscription_response: OPCUA_CREATE_SUBSCR_RESPONSE;
		GET_ENDPOINTS_REQUEST -> get_endpoints_request: OPCUA_GET_ENDPOINTS_REQUEST;
		GET_ENDPOINTS_RESPONSE -> get_endpoints_response: OPCUA_GET_ENDPOINTS_RESPONSE;
		default -> not_parsed: empty;
	};
}

type REQUEST_HEADER() = record{
	authentication_token : NODE_ID;
	timestamp: uint64;
	request_handle: uint32;
	return_diagnostics: uint32;
	audit_entry_id: uint32;
	timeout_hint: uint32;
	additional_header: uint8[3];
}

type RESPONSE_HEADER() = record{
	timestamp: uint64;
	request_handle: uint32;
	service_result: uint32;
	service_diagnostics_flag: uint32;
	string_table: uint32;
	additional_header: uint8[3];
}

type OPEN_SECURE_CHANNEL_REQUEST() = record{
	header: REQUEST_HEADER;
	client_protocol_version: uint32;
	security_token_request_type: uint32;
	message_security_mode: uint32;
	client_nonce: uint16;
	request_lifetime: uint32;
}

type OPEN_SECURE_CHANNEL_RESPONSE() = record{
	header: RESPONSE_HEADER;
	client_protocol_version: uint32;
	security_token_request_type: uint32;
	message_security_mode: uint32;
	client_nonce: uint16;
	request_lifetime: uint32;
}


type OPCUA_PUBLISH_REQUEST() = record{
	header: REQUEST_HEADER;
	subscription_ack: uint32;
}

type OPCUA_CLOSE_SECURE_CHANNEL_REQUEST() = record{
	header: REQUEST_HEADER;
}

type OPCUA_CLOSE_SECURE_CHANNEL_RESPONSE() = record{
	header: RESPONSE_HEADER;

}
type OPCUA_BROWSE_REQUEST() = record{
	header: REQUEST_HEADER;
	view: VIEW_DESCRIPTION;
	requested_max_references_per_node: uint32;
}

type OPCUA_BROWSE_RESPONSE()= record{
	header: RESPONSE_HEADER;
	results: uint64;
	diagnostic_info_collection: uint64;
}

type OPCUA_PUBLISH_RESPONSE() = record{
	header: RESPONSE_HEADER;
	subscription_id: uint64;
	available_sequence_numbers: uint64;
	more_notifications: uint8;
	notification_message: uint64;
	status_code_collection: uint64;
	diagnostic_info_collection: uint64;
}

type NOTIFICATION_MESSAGE() = record{
	sequence_number: uint32;
	publish_time: uint64;
	notification_data: uint64;
}



type VIEW_DESCRIPTION() = record{
	view_id: NODE_ID;
	time_stamp: uint64;
	view_version: uint32;

}

type OPCUA_READ_REQUEST() = record{
	header: REQUEST_HEADER;
	max_age: uint64;
  time_stamp: uint64;
	nodetoread: uint64;
}

type OPCUA_READ_RESPONSE() = record{
	header: RESPONSE_HEADER;
	results: uint64;
	diagnostic_info_collection: uint64;
}

type OPCUA_WRITE_REQUEST() = record{
	header: REQUEST_HEADER;
	nodes_to_write: uint64;
}

type OPCUA_WRITE_RESPONSE() = record{
	header: RESPONSE_HEADER;
	results: uint64;
	diagnostic_info_collection: uint64;
}

type OPCUA_CREATE_SUBSCR_REQUEST() = record{
	header: REQUEST_HEADER;
	requested_publishing_interval: uint64;
	requested_lifetime_count: uint32;
	requested_max_keep_alive_count: uint32;
	max_notifications_per_publish: uint32;
	publishing_enabled: uint8;
	priority: uint8;
}

type OPCUA_CREATE_SUBSCR_RESPONSE() = record{
	header: RESPONSE_HEADER;
	revised_publishing_interval: uint64;
	revised_lifetime_count: uint32;
	revised_max_keep_alive_count: uint32;

}

type OPCUA_GET_ENDPOINTS_REQUEST() = record{
	header: REQUEST_HEADER;
	end_point_url: uint32;
	local_lelds: uint64;
	profile_uris: uint64;
}

type OPCUA_GET_ENDPOINTS_RESPONSE() = record{
	header: RESPONSE_HEADER;
	end_points: uint64;

}

type NODE_ID() = record{
	namespace_index: uint32;
	type_id: uint8[4] &byteorder=littleendian;
	id: uint16;

}
