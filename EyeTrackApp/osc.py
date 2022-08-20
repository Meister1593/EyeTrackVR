from pythonosc import udp_client
import queue
import threading
from enum import IntEnum


class EyeId(IntEnum):
    RIGHT = 0
    LEFT = 1
    BOTH = 2


class VRChatOSC:
    # VRChat OSC Networking Info. For now, we'll assume it's always local.
    OSC_IP = "127.0.0.1"
    OSC_PORT = 9000  # VR Chat OSC port

    # Use a tuple of blink (true, blinking, false, not), x, y for now. Probably clearer as a class but
    # we're stuck in python 3.6 so still no dataclasses. God I hate python.
    def __init__(
        self,
        cancellation_event: "threading.Event",
        msg_queue: "queue.Queue[tuple[bool, int, int, int]]",
    ):
        self.client = udp_client.SimpleUDPClient(VRChatOSC.OSC_IP, VRChatOSC.OSC_PORT)
        self.cancellation_event = cancellation_event
        self.msg_queue = msg_queue
        yl = 0
        yr = 0

        sx = 0 
        se = 0



    def run(self):

        while True:
            if self.cancellation_event.is_set():
                print("Exiting OSC Queue")
                return
            try:
                (eye_id, eye_info) = self.msg_queue.get(block=True, timeout=0.1)
            except queue.Empty:
                continue
  
                    
          
            if not eye_info.blink:
                if eye_id in [EyeId.RIGHT, EyeId.BOTH]:
                    sx = eye_info.x
                    self.client.send_message(
                        "/avatar/parameters/RightEyeX", eye_info.x
                    )
                   # self.client.send_message(
                   #     "/avatar/parameters/EyesDilation", eye_info.pupil_dialation
                    #)
                if eye_id in [EyeId.LEFT, EyeId.BOTH]:
                    sx = eye_info.x
                    self.client.send_message(
                        "/avatar/parameters/LeftEyeX", eye_info.x
                    )
 
                if eye_id in [EyeId.LEFT, EyeId.BOTH]:
                    yl = eye_info.y 

                if eye_id in [EyeId.RIGHT, EyeId.BOTH]:
                    yr = eye_info.y

                try:
                    y = (yr + yl) / 2
                    self.client.send_message("/avatar/parameters/EyesY", y)
                    se = 0
                except:
                    se = 1
                    self.client.send_message("/avatar/parameters/LeftEyeX", sx)  # only one eye is detected or there is an error. Send mirrored data to both eyes.
                    self.client.send_message("/avatar/parameters/RightEyeX", sx)
                    self.client.send_message("/avatar/parameters/RightEyeLid", float(0))
                    self.client.send_message("/avatar/parameters/LeftEyeLid", float(0))
                    
                    
                if eye_id in [EyeId.LEFT, EyeId.BOTH]:
                    
                    self.client.send_message(
                        "/avatar/parameters/LeftEyeLid", float(0)
                    )
                if eye_id in [EyeId.RIGHT, EyeId.BOTH]:
                    
                    self.client.send_message(
                        "/avatar/parameters/RightEyeLid", float(0)
                    )



            else:
                if eye_id in [EyeId.LEFT, EyeId.BOTH]:
                    
                    self.client.send_message(
                        "/avatar/parameters/LeftEyeLid", float(1)
                    )
                if eye_id in [EyeId.RIGHT, EyeId.BOTH]:
                    
                    self.client.send_message(
                        "/avatar/parameters/RightEyeLid", float(1)
                    )
                if se == 1:
                    self.client.send_message("/avatar/parameters/RightEyeLid", float(1))
                    self.client.send_message("/avatar/parameters/LeftEyeLid", float(1))

    