import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

export default function Menu({ tab, setTab }) {
  return (
    <>
      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
        indicatorColor="primary"
        textColor="primary"
        aria-label="tabs"
      >
        <Tab label="List" icon={<FormatListBulletedIcon />} />
        <Tab label="Charts" icon={<EqualizerOutlinedIcon />} />
        <Tab label="Reports" icon={<DescriptionOutlinedIcon />} />
      </Tabs>
    </>
  );
}

Menu.propTypes = {
  tab: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired,
};
