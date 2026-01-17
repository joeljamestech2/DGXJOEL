-- Joel XMD YT Downloader AppleScript
-- This script will start the server (if using Terminal) and open the app in Safari

-- 1. Open Terminal and start the server
tell application "Terminal"
    activate
    do script "cd " & (POSIX path of (path to desktop folder)) & "joel-xmd-downloader && npm start"
end tell

-- 2. Wait a few seconds for server to start
delay 5

-- 3. Open Safari to the local app
tell application "Safari"
    activate
    open location "http://localhost:3000"
end tell
