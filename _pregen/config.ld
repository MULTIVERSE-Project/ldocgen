custom_tags = {
	{"realm", hidden = true},
	{"internal", hidden = true},
	{"inherits", hidden = true},
	{"doc", hidden = true}
}

custom_display_name_handler = function(item, default_handler)
	if (item.type == "function" and item.module) then
		if (item.module.type == "classmod" or item.module.type == "panel") then
			return item.module.mod_name .. ":" .. default_handler(item)
		elseif (item.module.type == "hooks") then
			return item.module.mod_name:upper() .. ":" .. default_handler(item)
		elseif (item.module.type == "ext") then
			return item.module.mod_name .. ":" .. default_handler(item)
		end
	end

	return default_handler(item)
end