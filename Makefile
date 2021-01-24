
DICT_NAME	= "jbovla"
DICT_SRC_PATH = "build/jbovla.xml"
DICT_CSS_PATH = "jbovla.css"
PLIST_PATH = "jbovla.plist"

DICT_BUILD_TOOL_DIR = "./dev-kit"
DICT_BUILD_TOOL_BIN = "$(DICT_BUILD_TOOL_DIR)/bin"

DICT_DEV_KIT_OBJ_DIR = "./build"
export DICT_DEV_KIT_OBJ_DIR

DESTINATION_DIR = "~/Library/Dictionaries"

.PHONY: build

build: $(DICT_SRC_PATH) $(CSS_PATH) $(PLIST_PATH)
	"$(DICT_BUILD_TOOL_BIN)/build_dict.sh" \
		$(DICT_NAME) \
		$(DICT_SRC_PATH) \
		$(DICT_CSS_PATH) \
		$(DICT_PLIST_PATH)
