import Head from "next/head";

export interface AffiliateCodesProps {
  mutations: { hosts: string[]; urlParams: [string, string][] }[];
}

export function AffiliateCodes({ mutations }: AffiliateCodesProps) {
  if (mutations.length === 0) return null;

  return (
    <Head>
      <script
        data-aff={mutations
          .map(
            ({ hosts, urlParams }) =>
              `${hosts.join(", ")} : ${urlParams.map(
                ([key, value]) => `${key} = ${value}`
              )}`
          )
          .join(" ! ")}
        src="https://cdn.jsdelivr.net/npm/affiliate@3.0/dist/affiliate.js"
        async
        id="aff-js"
      />
    </Head>
  );
}
