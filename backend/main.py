import os
import logging
# --- logging
logging.basicConfig(level=logging.INFO,format='%(asctime)s - %(levelname)-9s - %(name)-15s - %(message)s')
# Disable werkzeug flask logging
# logging.getLogger("werkzeug").setLevel(logging.ERROR)

# --- imports
from multiprocessing import Process, Event
# -- local imports
from app.app import app
from app.sse.manager import start_sse
from app.utils import get_ip

# --- run main
if __name__ == '__main__':
    from app.config import config
    # --- start the SSE server
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true" or not app.debug:
        logging.info(f"serve in LAN http://{get_ip()}:{config.app_socketNr}")
        # process event to synchronize server startups, wait for SSE server to be ready
        if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
            logging.info("We run under Werkzeug, so we are in the reloaded subprocess")
        elif not app.debug:
            logging.info("We run in production mode")
        sse_ready_event = Event()
        sse_process = Process(target=start_sse, daemon=True, args=(sse_ready_event,config.sse_port))
        sse_process.start()
        global_pid = sse_process.pid  # Store PID in the global variable
        logging.info(f"SSE -- Started SSE server process with PID: {global_pid}")
        sse_ready_event.wait() # wait for the server to be ready
        logging.info("Starting Flask app")
    # Start the Flask application in a separate thread
    app.run(host='0.0.0.0', port=config.app_socketNr, threaded=True, debug=False)
