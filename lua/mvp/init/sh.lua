--- @module mvp

--- Table with all mvp functions and variables, also contains default colors as well as log levels. Note that colors should be used only for console printing, not for HUD or other stuff.
-- @table mvp
-- @realm shared
-- @field LOG_DEBUG Log level for debug messages
-- @field LOG_INFO Log level for info messages
-- @field LOG_WARNING Log level for warning messages
-- @field LOG_ERROR Log level for error messages
-- @field WHITE Color White color
-- @field BLACK Color Black color
-- @field RED Color Red color
-- @field GREEN Color Green color
-- @field BLUE Color Blue color
-- @field CYAN Color Cyan color
-- @field YELLOW Color Yellow color
-- @field ORANGE Color Orange color
-- @field GRAY Color Gray color


mvp = mvp or {}

-- default colors for console
mvp.WHITE = Color(255, 255, 255, 255)
mvp.BLACK = Color(0, 0, 0, 255)
mvp.RED = Color(255, 0, 0, 255)
mvp.GREEN = Color(0, 255, 0, 255)
mvp.BLUE = Color(0, 102, 255)
mvp.CYAN = Color(0, 168, 255)
mvp.YELLOW = Color(255, 255, 0, 255)
mvp.ORANGE = Color(225, 177, 44)
mvp.GRAY = Color(207, 207, 207)



-- log levels
mvp.LOG_DEBUG = 0
mvp.LOG_INFO = 1
mvp.LOG_WARNING = 2
mvp.LOG_ERROR = 3  

-- Load loader for later use
if SERVER then AddCSLuaFile('mvp/core/sh_loader.lua') end
include('mvp/core/sh_loader.lua')

mvp.loader.LoadServerFile('init/sv.lua')
mvp.loader.LoadClientFile('init/cl.lua')

mvp.loader.LoadFolder('core/logger')
mvp.logger.Init()