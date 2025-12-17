import {
  Lock01,
  Shield01,
  Globe01,
  Target01,
  Database01,
} from '@untitledui/icons'
import type { FC } from 'react'

export enum EnterpriseFeatureId {
  SAML_SSO = 'saml-sso',
  DATA_RESIDENCY = 'data-residency',
  SOC2 = 'soc2',
  GDPR_CCPA = 'gdpr-ccpa',
  UPTIME_SLA = 'uptime-sla',
  DATA_ENCRYPTION = 'data-encryption',
  JWT = 'jwt',
  AUDIT_LOG = 'audit-log',
}

interface EnterpriseFeature {
  id: EnterpriseFeatureId
  name: string
  description: string
  icon: FC<{ className?: string }>
}

const ENTERPRISE_FEATURES_MAP: Record<EnterpriseFeatureId, EnterpriseFeature> =
  {
    [EnterpriseFeatureId.SAML_SSO]: {
      id: EnterpriseFeatureId.SAML_SSO,
      name: 'SAML single sign-on',
      description:
        'Seamlessly enable enterprise-grade authentication and secure access.',
      icon: Lock01,
    },
    [EnterpriseFeatureId.DATA_RESIDENCY]: {
      id: EnterpriseFeatureId.DATA_RESIDENCY,
      name: 'Data residency',
      description:
        'Control where your data resides, ensuring compliance with regional regulations.',
      icon: Globe01,
    },
    [EnterpriseFeatureId.SOC2]: {
      id: EnterpriseFeatureId.SOC2,
      name: 'SOC 2 (Type 2)',
      description:
        'Certifies our security policies and controls meet the highest industry standards.',
      icon: Shield01,
    },
    [EnterpriseFeatureId.GDPR_CCPA]: {
      id: EnterpriseFeatureId.GDPR_CCPA,
      name: 'GDPR & CCPA',
      description:
        'Your data privacy is safeguarded with full compliance with EU regulations.',
      icon: Lock01,
    },
    [EnterpriseFeatureId.UPTIME_SLA]: {
      id: EnterpriseFeatureId.UPTIME_SLA,
      name: 'Uptime SLA',
      description:
        'We guarantee exceptional service reliability with a robust uptime commitment.',
      icon: Target01,
    },
    [EnterpriseFeatureId.DATA_ENCRYPTION]: {
      id: EnterpriseFeatureId.DATA_ENCRYPTION,
      name: 'Data Encryption',
      description:
        'Your data is always protected with industry-leading encryption in transit and at rest.',
      icon: Lock01,
    },
    [EnterpriseFeatureId.JWT]: {
      id: EnterpriseFeatureId.JWT,
      name: 'JWT',
      description:
        'Leverage secure, stateless authentication tokens for fast and reliable access control.',
      icon: Shield01,
    },
    [EnterpriseFeatureId.AUDIT_LOG]: {
      id: EnterpriseFeatureId.AUDIT_LOG,
      name: 'Audit Log',
      description:
        'Monitor a detailed trail of user actions, ensuring transparency and security.',
      icon: Database01,
    },
  }

export const ENTERPRISE_FEATURES_ITEMS: EnterpriseFeature[] = Object.values(
  ENTERPRISE_FEATURES_MAP,
)
