import { pickRelevantIntegrationParams } from './index';

describe('pickRelevantIntegrationParams', () => {
  it('should return correct params for ZENDESK integration', () => {
    const params = { zendeskSubdomain: 'example' };
    expect(pickRelevantIntegrationParams('ZENDESK', params)).toEqual({
      zendesk_subdomain: 'example',
    });
  });

  it('should return correct params for FRESHDESK integration', () => {
    const params = { freshdeskDomain: 'example', freshdeskApiKey: 'example' };

    console.log(pickRelevantIntegrationParams('FRESHDESK', params));
    expect(pickRelevantIntegrationParams('FRESHDESK', params)).toEqual({
      domain: 'example',
      api_key: 'example',
    });
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
