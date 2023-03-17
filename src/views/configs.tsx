import { isEqual } from "lodash";
import React, { useState, useEffect } from "react";
import { symbol } from "zod";
import AssetConfigs from "../models/asset-configs";

export function View({ init, onSave }: { init: AssetConfigs, onSave: (configs: AssetConfigs) => void }) {

  const [assets, setAssets] = useState(init.assetConfigs);

  useEffect(
    () => {
      if (!isEqual(assets, init.assetConfigs)) {
        setAssets(init.assetConfigs);
      }
    },
    [init.assetConfigs]
  );

  function onSymbolChange(assetName: string, newSymbol: string) {
    setAssets(assets.map(asset => {
      if (asset.name === assetName) {
        return { ...asset, symbol: newSymbol };
      } else {
        return asset;
      }
    }));
  }

  return (
    <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <button className="uk-modal-close-default" type="button" uk-close="true"></button>

      <h3>Configs</h3>

      <h5>Asset Symbols</h5>
      <form className="uk-form-horizontal uk-margin-large">
        {assets.map((asset) => {
          const domId = `id-${asset.name.toLowerCase()}-account-setting`;
          const placeholder = `YahooFinance symbol of this asset`;

          return (
            <div className="uk-margin" key={domId}>
              <label className="uk-form-label" htmlFor={domId}>{asset.name}</label>
              <div className="uk-form-controls">
                  <input className="uk-input uk-form-blank" type="text" id={domId} placeholder={placeholder}
                          value={asset.symbol} onChange={ e => onSymbolChange(asset.name, e.target.value) } />
              </div>
            </div>
          );
        })}
      </form>

      <p className="uk-text-right">
          <button className="uk-button uk-button-default uk-modal-close uk-margin-right" type="button">Cancel</button>
          <button className="uk-button uk-light uk-button-accent uk-modal-close" type="button"
                  onClick={() => {onSave(new AssetConfigs(assets))}}>Save</button>
      </p>
    </div>
  );
}
