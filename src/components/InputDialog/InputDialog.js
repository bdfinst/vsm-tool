import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core'
import { HelpOutline, InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { IconButtonStyled } from '../Buttons'
import {
  InputAccuracy,
  InputActors,
  InputProcessName,
  InputProcessTime,
  InputWaitTime,
} from './InputFields'
import { defaultNodeData } from '../../helpers'
import { useValueStream } from '../../appContext/valueStreamContext'
import inputFieldDefs from './fieldDefs'

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '5 5 5 5 ',
    margin: 8,
  },
  help: {
    color: theme.palette.primary.light,
    fontSize: 'medium',
  },
  insertLeft: {
    transform: 'rotateY(180deg)',
    color: theme.textPrimary,
  },
  insertRight: {
    color: theme.textPrimary,
  },
  icon: {
    fontSize: 40,
    color: theme.textPrimary,
  },
  paper: {
    textAlign: 'center',
  },
}))

const InputBlock = ({ onClose, open, selectedNode }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const {
    state,
    changeNodeValues,
    addNodeBefore,
    addNodeAfter,
  } = useValueStream()

  const [inputs, setInputs] = useState(inputFieldDefs)

  const [submitted, setSubmitted] = useState(false)
  const [errorList, setErrorList] = useState({})
  const [nodeData, setNodeData] = useState(defaultNodeData)

  const handleClose = () => {
    console.log('Close Dialog')
    setSubmitted(false)
    onClose()
  }

  const errorListExists = (errors) => {
    return Object.entries(errors).find((e) => e[1] === true)
  }

  useEffect(() => {
    if (selectedNode && open) {
      setInputs(inputFieldDefs)
      populateFormDefaults(selectedNode)
    } else {
      handleClose()
    }
  }, [selectedNode])

  useEffect(() => {
    const error = errorListExists(errorList)
    if (submitted && !error) handleClose()
  }, [submitted, errorList])

  const populateFormDefaults = (node) => {
    const newInputs = [...inputFieldDefs]

    for (const key in node.data) {
      const index = inputs.findIndex((item) => {
        return item.id === key
      })
      const input = inputs[index]

      newInputs[index] = {
        ...input,
        value: selectedNode.data[key],
      }
    }
    setInputs(newInputs)
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault()

    console.log('handleSubmit')
    console.log(nodeData)
    console.log(errorList)

    if (!errorListExists(errorList)) {
      changeNodeValues({ node: selectedNode, data: nodeData })
      setSubmitted(true)
    }
  }

  const handleChange = (data, errors) => {
    setErrorList(errors)
    setNodeData(data)
  }

  const handleInsertStep = () => {
    addNodeBefore(selectedNode)
  }
  const handleAddStep = () => {
    addNodeAfter(selectedNode)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* <DialogTitle id="form-dialog-title">
        Process {selectedNode.id}
      </DialogTitle> */}
      <DialogContent>
        <form>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <InputProcessName
              node={selectedNode}
              errors={errorList}
              onChange={handleChange}
            />
            <InputProcessTime
              node={selectedNode}
              errors={errorList}
              onChange={handleChange}
            />
            <InputWaitTime
              node={selectedNode}
              errors={errorList}
              onChange={handleChange}
            />
            <InputAccuracy
              node={selectedNode}
              errors={errorList}
              onChange={handleChange}
            />
            <InputActors
              node={selectedNode}
              errors={errorList}
              onChange={handleChange}
            />
            {/* <Grid item xs={12}>
              <TextField
                autoFocus
                className={classes.input}
                id={inputs[0].id}
                label={inputs[0].label}
                placeholder={inputs[0].placeholder}
                value={inputs[0].value}
                onChange={handleChange}
                error={inputs[0].error}
                helperText={inputs[0].helperText}
                margin="dense"
                size="small"
                type="text"
                fullWidth
                required
              />
            </Grid>
            {inputs
              .filter((input) => input.id !== 'processName')
              .map((input) => (
                <Grid
                  item
                  key={`gi_${input.id}`}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  xs={6}
                >
                  <Grid item key={`field_${input.id}`} xs={12}>
                    <TextField
                      id={input.id}
                      label={input.label}
                      placeholder={input.placeholder}
                      value={Number(input.value)}
                      onChange={handleChange}
                      error={input.error}
                      helperText={input.helperText}
                      type="number"
                      size="small"
                      margin="dense"
                      required
                    />
                    <Tooltip title={input.toolTip}>
                      <HelpOutline className={classes.help} />
                    </Tooltip>
                  </Grid>
                </Grid>
              ))}*/}
          </Grid>
        </form>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
            <IconButtonStyled
              title="Add step before"
              onClick={handleInsertStep}
            >
              <InputOutlined
                className={`${classes.icon} ${classes.insertLeft}`}
              />
            </IconButtonStyled>
          </Grid>
          <Grid item xs={6}>
            <IconButtonStyled title="Add step after" onClick={handleAddStep}>
              <InputOutlined
                className={`${classes.icon} ${classes.insertRight}`}
              />
            </IconButtonStyled>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InputBlock
