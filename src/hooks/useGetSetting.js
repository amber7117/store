// File: useGetSetting.js

import Cookies from "js-cookie";
import { useEffect } from "react";

// Internal imports
import useAsync from "./useAsync";
import SettingServices from "@services/SettingServices";

const useGetSetting = () => {
  // Get the language cookie value
  const lang = Cookies.get("_lang");

  // Fetch global settings
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  // Fetch store customization settings
  const {
    data: storeCustomizationSetting,
    loading,
    error,
  } = useAsync(SettingServices.getStoreCustomizationSetting);

  useEffect(() => {
    // Check if the "lang" value is not set and set a default value
    if (!lang) {
      Cookies.set("_lang", "en", {
        sameSite: "None",
        secure: true,
      });
    }
  }, [lang]);

  // Return settings and states
  return {
    lang,
    error,
    loading,
    globalSetting,
    storeCustomizationSetting,
  };
};

export default useGetSetting;
