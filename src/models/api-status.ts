interface API_Status {
    current_season: number;
    max_season: number;
    is_datafeed_down: boolean;
    down_events: string[];
    ios: API_Status_App_Version;
    android: API_Status_App_Version;
}

interface API_Status_App_Version {
    min_app_version: number;
    latest_app_version: number;
}

export { API_Status, API_Status_App_Version };