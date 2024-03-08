import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import "../"

const SocialMedia = () => {

    const BootstrapTooltip: any = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.black,
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.black,
        },
    }));

    return (
        <>



            <a href="https://www.linkedin.com/in/001patilritesh/">
                <BootstrapTooltip title="/in/001patilritesh">
                    <LinkedInIcon></LinkedInIcon>
                </BootstrapTooltip>
            </a>
            <a href="https://github.com/coder-Rit/">
                <BootstrapTooltip title="/coder-Rit">
                    <GitHubIcon></GitHubIcon>
                </BootstrapTooltip>
            </a>
            <a href="tel:+919119512822">
                <BootstrapTooltip title="+919119512822">
                    <CallIcon></CallIcon>
                </BootstrapTooltip>
            </a>
            <a href="mailto:001patilritesh@gmail.com">
                <BootstrapTooltip title="001patilritesh@gmail.com">
                    <EmailIcon></EmailIcon>
                </BootstrapTooltip>

            </a>

        </>

    )
}

export default SocialMedia