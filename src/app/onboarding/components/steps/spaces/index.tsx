import { useEffect } from 'react'
import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useStepTimer } from '@/hooks/use-step-timer'
import {
  onboardingAppendForm,
  onboardingGoToNextStep,
  onboardingSelectSpaces,
} from '@/store/onboarding'
import { trackEvent } from '@/utils/segment/analytics'

import { SPACE_OPTIONS } from '../../constants'
import { SpaceItem } from './space-item'

const FEATURED_SPACES = [
  'feed',
  'discussions',
  'events',
  'qa',
  'articles',
  'directory',
]

export const WizardSpacesStep = () => {
  const selectedSpaces = useAppSelector(onboardingSelectSpaces)
  const dispatch = useAppDispatch()
  const { getTimeSpent } = useStepTimer()

  useEffect(() => {
    const featuredCount = SPACE_OPTIONS.filter(s =>
      FEATURED_SPACES.includes(s.id),
    ).length
    trackEvent('wizard_spaces_viewed', {
      total_spaces_available: SPACE_OPTIONS.length,
      featured_spaces_count: featuredCount,
      additional_spaces_count: SPACE_OPTIONS.length - featuredCount,
    })
  }, [])

  const handleSpaceToggle = (spaceId: string) => {
    const space = SPACE_OPTIONS.find(s => s.id === spaceId)
    const isSelected = selectedSpaces.includes(spaceId)
    const isFeatured = FEATURED_SPACES.includes(spaceId)

    if (isSelected) {
      trackEvent('wizard_space_deselected', {
        space_id: spaceId,
        space_name: space?.name,
        total_selected: selectedSpaces.length - 1,
      })
    } else {
      trackEvent('wizard_space_selected', {
        space_id: spaceId,
        space_name: space?.name,
        space_category: isFeatured ? 'featured' : 'additional',
        total_selected: selectedSpaces.length + 1,
      })
    }

    let newSpaces: string[] = []
    if (isSelected) {
      newSpaces = selectedSpaces.filter(id => id !== spaceId)
    } else {
      newSpaces = [...selectedSpaces, spaceId]
    }
    dispatch(onboardingAppendForm({ spaces: newSpaces }))
  }

  const onNext = () => {
    const featuredSelected = selectedSpaces.filter(id =>
      FEATURED_SPACES.includes(id),
    )
    trackEvent('wizard_spaces_submitted', {
      selected_spaces: selectedSpaces,
      spaces_count: selectedSpaces.length,
      featured_spaces_count: featuredSelected.length,
      additional_spaces_count: selectedSpaces.length - featuredSelected.length,
      time_spent_on_step: getTimeSpent(),
    })
    dispatch(onboardingGoToNextStep())
  }

  return (
    <StepContainer
      title="Activate your starting spaces"
      description="Pick a few spaces to shape your community. You can add more later."
      footer={
        <div className="justify-end lg:flex lg:pt-4">
          <Button
            onClick={onNext}
            size="sm"
            isDisabled={selectedSpaces.length < 2}
            className="w-full lg:w-auto"
          >
            Create my community
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          {SPACE_OPTIONS.map((space, index) => (
            <div key={index}>
              <SpaceItem
                space={space}
                onClick={handleSpaceToggle}
                isSelected={selectedSpaces.includes(space.id)}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-tertiary text-xs">
            At least two spaces are recommended for a clean start.
          </p>
        </div>
      </div>
    </StepContainer>
  )
}
