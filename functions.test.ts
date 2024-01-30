import { pickRelevantIntegrationParams } from './index';

describe('pickRelevantIntegrationParams', () => {
  it('should return correct params for ZENDESK integration', () => {
    const params = { zendeskSubdomain: 'example' };
    expect(pickRelevantIntegrationParams('ZENDESK', params)).toEqual({
      zendesk_subdomain: 'example',
    });
  });

  it('should return empty object if integration is not supported', () => {
    const params = { zendeskSubdomain: 'example' };
    expect(pickRelevantIntegrationParams('NOT_SUPPORTED', params)).toEqual({});
  });

  it('should throw error if all params are not provided', () => {
    const params = { zendeskSubdomainValue: 'example' };
    expect(() => pickRelevantIntegrationParams('ZENDESK', params)).toThrow(
      'Zendesk integration requires a zendeskSubdomain parameter.'
    );
  });

  it('should return correct params for SHAREPOINT integration', () => {
    const params = {
      microsoftTenant: 'example',
      sharepointSiteName: 'example',
    };
    expect(pickRelevantIntegrationParams('SHAREPOINT', params)).toEqual({
      microsoft_tenant: 'example',
      sharepoint_site_name: 'example',
    });
  });

  it('should return correct params for CONFLUENCE integration', () => {
    const params = { confluenceSubdomain: 'example' };
    expect(pickRelevantIntegrationParams('CONFLUENCE', params)).toEqual({
      confluence_subdomain: 'example',
    });
  });
});
