"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useStorage } from "@/providers/storageProvider";
import { useSettingsContext } from "@/providers/settingsProvider";
import useScoringApiInstance from "@/hooks/api/useScoringApiInstance";
import { isApiKeyActive, requestApiKey, waitForApiKey } from "@/lib/scoringApi";
import { cn } from "@/lib/classNames";

const ApiKey = () => {
  const { apiKey, endpoint, setData } = useStorage();
  const instance = useScoringApiInstance();
  const { apiKeyStatus, setApiKeyStatus } = useSettingsContext();

  useEffect(() => {
    if (apiKey) {
      if (apiKeyStatus === "WAITING" || apiKeyStatus === "ACTIVE") return;
      isApiKeyActive(instance, apiKey).then((active) => {
        setApiKeyStatus(active ? "ACTIVE" : "WAITING");
        if (!active) {
          waitForApiKey(instance, apiKey).then((active) => {
            setApiKeyStatus(active ? "ACTIVE" : "WAITING");
          });
        }
      });
    } else {
      setApiKeyStatus("INITIAL");
    }
  }, [instance, apiKey, apiKeyStatus, setApiKeyStatus]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <Label>API Connection</Label>
          {apiKeyStatus === "WAITING" && (
            <p className="text-sm text-muted-foreground">
              Please approve the following key in{" "}
              <a
                href={`http://${endpoint}/manage/`}
                target="_blank"
                className="text-blue-500 underline"
              >
                the scoring system
              </a>
              .
            </p>
          )}
          {apiKey && (
            <code className="block text-xs text-muted-foreground font-mono">
              {apiKey}
            </code>
          )}
        </div>
        {apiKeyStatus === "INITIAL" ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              requestApiKey(instance).then((key) => {
                setData("apiKey", key);
              });
            }}
          >
            Connect
          </Button>
        ) : (
          <Badge
            className={cn("flex-shrink-0", {
              "text-green-400": apiKeyStatus === "ACTIVE",
              "text-yellow-500": apiKeyStatus === "WAITING",
            })}
            variant="outline"
          >
            {apiKeyStatus === "LOADING"
              ? "Loading..."
              : apiKeyStatus === "WAITING"
              ? "Waiting for approval"
              : "Active"}
          </Badge>
        )}
      </div>
    </>
  );
};

export default ApiKey;
