import React, { useState } from 'react'
import { ModalWrapper, Title, ButtonsWrapper } from '../styles'
import { Modal } from '@components/Modal'
import { Button } from '@components/Button'
import { authenticatedRequest } from '@services/api'
import { useSnackbar } from '@hooks/useSnackbar'
import Lottie from 'react-lottie'
import animationData from '@assets/animation/warning.json'

interface Props {
  postId: string
  open: boolean
  handleClose: () => void
  getPostsAfterDelete?: () => Promise<void>
}

export const DeleteModal: React.FC<Props> = ({
  postId,
  open,
  handleClose,
  getPostsAfterDelete
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { addAlert } = useSnackbar()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      const apiAuthenticated = authenticatedRequest()
      if (!apiAuthenticated) {
        if (addAlert) {
          addAlert({
            message: 'É preciso estar logado para realizar essa ação',
            severity: 'warning'
          })
        }
        return null
      }

      await apiAuthenticated.delete(`posts/delete/${postId}`)
      if (getPostsAfterDelete) {
        await getPostsAfterDelete()
      }

      setLoading(false)

      if (addAlert) {
        addAlert({
          message: 'Postagem deletada com sucesso',
          severity: 'success'
        })
      }
      handleClose()
    } catch {
      if (addAlert) {
        setLoading(false)
        addAlert({
          message: 'Não foi possível deletar a postagem',
          severity: 'error'
        })
      }
      handleClose()
    }
  }

  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalWrapper>
        <Title>Deseja deletar essa postagem?</Title>
        <Lottie
          options={defaultOptions}
          height={150}
          width={150}
          isStopped={false}
          isPaused={false}
        />
        <ButtonsWrapper>
          <Button onClick={handleDelete} loading={loading}>
            Confirmar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </ButtonsWrapper>
      </ModalWrapper>
    </Modal>
  )
}
