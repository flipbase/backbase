/**
 * Nadenken hoe we deze data op de server gaan opslaan
 *
 * Fetching and saving van data gebeurt in hier in de state; niet in de components
 * components doen niets anders dan shit renderen.
 */

var config = {
  webcam: {
    flash_config: {},
    flashvars: {},
    params: {},
  }
};

/**
 * What is the difference between logs and recordings?!
 *
 * Logs are not stored longer then 7 days in Loggly!
 */

var state = {

  // All data related to the video object store, plus metadata of the last
  // recording attempt to include.
  video: {
    _id: null,
    status: null,
    created_at: null,
    updated_at: null,

    last_recording: {
      settings: {
        width: null,
        height: null,
        resolution: 'VGA',
        duration: 31,
        keyframe_interval: 15,
        fps: 24,
        video_codec: 'Sorenson', // H264, On2, Sorenson
        audio_codec: 'Speex', // Speex, Nellymoser, MP3
        locale: 'en_us'
      },
      metadata: {
        duration: 0,
        method: 'webcam',
        user_agent: null,
      }
    }
  },


  // We seperate the recordings and the uploads so the amount of data will be
  // too much to send over the wire using JSONP
  recordings: {
    videoId: null,
    clientUUID: null, // so we can query how often people retry-after page refresh

    browser: {
      user_agent: null,
      xhr2_support: true,
      pepper_flash: true,
      activex_filtering: true,
      device_orientation: 0,
      flash_player: null,
      external_interface: undefined,
      flash_embedded: true
    },

    type: 'webcam',

    // Below props will only be included when recording method = webcam
    webcam: {
      duration: 12,
      cam_status: 'muted',
      mic_status: 'unmuted',
      net_connection: 'connected',
      net_stream: 'connected',
      quality_setting: 0, 
      bandwidth_setting: 0,
      avg_mic_activity: 0,
      avg_fps_ns: 22,
      camera: {
        name: undefined,
        width: 0,
        height: 0,
        fps: 0
      }
    },

    upload: {
      file_selected: true,
      progress: 0,
      upload_duration: 0
    },

    settings: {
      width: null,
      height: null,
      resolution: 'VGA',
      duration: 31,
      keyframe_interval: 15,
      fps: 24,
      video_codec: 'Sorenson', // H264, On2, Sorenson
      audio_codec: 'Speex', // Speex, Nellymoser, MP3
      locale: 'en_us'
    }

  }

};

// scheidt transactionele gebruikers data van statische instellingen.

module.exports = state;