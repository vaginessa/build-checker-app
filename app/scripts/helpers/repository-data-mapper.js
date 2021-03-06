'use babel';

import $ from 'jquery';
import CONFIG from '../constants/AppConstants';

const getClassByBuildStatus = (lastBuildStatus) => {
  let statusClassname = '';
  switch (lastBuildStatus) {
    case CONFIG.BUILD_STATUS_SUCCESS:
      statusClassname = CONFIG.CARD_SUCCESS_CLASS;
      break;
    case CONFIG.BUILD_STATUS_PENDING:
    case CONFIG.BUILD_STATUS_UNKNOWN:
      statusClassname = CONFIG.CARD_PENDING_CLASS;
      break;
    case CONFIG.BUILD_STATUS_FAILURE:
      statusClassname = CONFIG.CARD_ERROR_CLASS;
      break;
    default:
      statusClassname = CONFIG.CARD_UNKNOWN_CLASS;
      break;
  }
  return statusClassname;
};

const getBuildIconByBuildStatus = (lastBuildStatus) => {
  let statusBuildIcon = '';
  switch (lastBuildStatus) {
    case CONFIG.BUILD_STATUS_SUCCESS:
      statusBuildIcon = CONFIG.SUCCESS_ICON;
      break;
    case CONFIG.BUILD_STATUS_PENDING:
    case CONFIG.BUILD_STATUS_UNKNOWN:
      statusBuildIcon = CONFIG.PENDING_ICON;
      break;
    default:
      statusBuildIcon = CONFIG.ERROR_ICON;
      break;
  }
  return statusBuildIcon;
};

const RepositoryDataMapper = {
  parse: (data) => {
    const xml = $($.parseXML(data));
    return xml.find('Projects').map(function() {
      const el = $(this).find('Project');
      const lastBuildStatus = el.attr('lastBuildStatus');
      return {
        lastBuildStatus,
        name: el.attr('name'),
        webUrl: el.attr('webUrl'),
        lastBuildLabel: el.attr('lastBuildLabel'),
        lastBuildTime: el.attr('lastBuildTime'),
        buildIcon: getBuildIconByBuildStatus(lastBuildStatus),
        class: getClassByBuildStatus(lastBuildStatus)
      };
    })[0];
  }
};

export default RepositoryDataMapper;
