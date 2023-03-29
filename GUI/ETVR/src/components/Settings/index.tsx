import CameraCalibrationSettings from './CameraCalibrationSettings'
import CameraConnectionStatus from './CameraConnectionStatus/CameraInfo'
import CameraSettings from './CameraSettings'
import CamerasModal from './CamerasModal'
import { RANGE_INPUT_FORMAT } from '@src/static/types/enums'
import { CameraStatus } from '@store/camera/camera'
import icons from '@assets/images'

export interface IProps {
    onChange: (format: string, value: number) => void
    onClick: (selected: string) => void
    onClickBack: () => void
    onClickCalibrate: () => void
    onClickRecenter: () => void
    onClickCroppingMode: () => void
    cameraStatus: CameraStatus
    camerasUrl: string[]
}

const Settings = (props: IProps) => {
    return (
        <div>
            <div class="pt-12">
                <div>
                    <div class="flex  cursor-pointer" onClick={() => props.onClickBack()}>
                        <div class="mr-3">
                            <img src={icons.arrow} alt="img" class=" w-full h-full m-auto" />
                        </div>
                        <div>
                            <p class="text-left text-white text-lg text-upper uppercase max-lg:text-sm ">
                                go back to home
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center gap-5">
                    <div class="mt-5 max-w-[700px] w-full ">
                        <div>
                            <div class="mb-5">
                                <CameraConnectionStatus cameraStatus={props.cameraStatus} />
                            </div>
                        </div>
                        <div>
                            <div class="mb-5">
                                <CameraCalibrationSettings
                                    onClickCalibrate={() => {
                                        props.onClickCalibrate()
                                    }}
                                    onClickRecenter={() => {
                                        props.onClickRecenter()
                                    }}
                                    onClickCroppingMode={() => {
                                        props.onClickCroppingMode()
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <CameraSettings
                                formats={Object.keys(RANGE_INPUT_FORMAT)}
                                onChange={(format, value) => {
                                    props.onChange(format, value)
                                }}
                            />
                        </div>
                    </div>
                    <div class="mt-5 max-w-[500px] w-full">
                        <CamerasModal camerasUrl={props.camerasUrl} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings
