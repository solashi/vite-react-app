import { autocompleteClasses, Fade, Popper, PopperProps, styled } from '@mui/material'
import { ReactElement } from 'react'

export type PopperAdditionProps = {
  size?: 'small' | 'medium' | 'large' | string
}

const StyledPopper = styled(Popper)<PopperAdditionProps>(({ theme, size }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: size === 'small' ? '0.75rem' : '1rem'
  },
  [`& .${autocompleteClasses.listbox}`]: {
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: theme.spacing(1),
      //   '&[aria-selected="true"]': {
      //     backgroundColor: 'transparent'
      //   },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }
}))

function PopperComponent(props: PopperProps & PopperAdditionProps) {
  const { children, ...other } = props

  return (
    <StyledPopper {...other} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={200}>
          {children as ReactElement}
        </Fade>
      )}
    </StyledPopper>
  )
}

export { PopperComponent }
