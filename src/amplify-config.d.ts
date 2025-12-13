declare module "*/amplify_outputs.json" {
  const value: {
    version: string;
    auth: {
      aws_region: string;
      user_pool_id: string;
      user_pool_client_id: string;
      identity_pool_id: string;
      password_policy: {
        min_length: number;
        require_lowercase: boolean;
        require_uppercase: boolean;
        require_numbers: boolean;
        require_symbols: boolean;
      };
      mfa_configuration: string;
      mfa_methods: string[];
      unauthenticated_identities_enabled: boolean;
      username_attributes: string[];
      user_verification_types: string[];
      standard_required_attributes: string[];
      oauth: {
        identity_providers: string[];
        domain: string;
        scopes: string[];
        redirect_sign_in_uri: string[];
        redirect_sign_out_uri: string[];
        response_type: string;
      };
    };
    data: Record<string, unknown>;
    storage: Record<string, unknown>;
    custom: Record<string, unknown>;
  };
  export default value;
}
