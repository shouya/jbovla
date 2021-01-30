
DICT_NAME	= jbovla
DICT_SRC_PATH = ./build/jbovla.xml
DICT_CSS_PATH = jbovla.css
DICT_PLIST_PATH = jbovla.plist

DICT_BUILD_TOOL_DIR = ./dev-kit
DICT_BUILD_TOOL_BIN = $(DICT_BUILD_TOOL_DIR)/bin

DICT_DEV_KIT_OBJ_DIR = ./build/objects
export DICT_DEV_KIT_OBJ_DIR

DICT_TARGET = $(DICT_DEV_KIT_OBJ_DIR)/$(DICT_NAME).dictionary

DESTINATION_DIR = ~/Library/Dictionaries

all: $(DICT_TARGET)

$(DICT_SRC_PATH): src/*.js
	deno run --allow-read=assets/ src/xml_zbasu.js >$@

$(DICT_TARGET): $(DICT_SRC_PATH)
	"$(DICT_BUILD_TOOL_BIN)/build_dict.sh" \
		$(DICT_NAME) \
		$(DICT_SRC_PATH) \
		$(DICT_CSS_PATH) \
		$(DICT_PLIST_PATH)

install: $(DICT_TARGET)
	cp -r $< $(DESTINATION_DIR)/


.PHONY: build install
