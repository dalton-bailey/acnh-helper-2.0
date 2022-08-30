import { React, useState } from "react";

const Settings = () => {
    const [hemisphere, setHemisphereData] = useState('')
    return (
        <div>
            <div>
                <p>Hemisphere</p>
                <p>Northern</p>
            </div>
        </div>
    )
}

export default Settings;