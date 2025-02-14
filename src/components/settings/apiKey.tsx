"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { useStorage } from "@/providers/storageProvider";
import useScoringApiInstance from "@/hooks/api/useScoringApiInstance";
import { isApiKeyActive, requestApiKey, waitForApiKey } from "@/lib/scoringApi";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/classNames";

const ApiKey = () => {
  const { apiKey, endpoint, setData } = useStorage();
  const instance = useScoringApiInstance();
  const [status, setStatus] = useState<
    "LOADING" | "INITIAL" | "WAITING" | "ACTIVE"
  >("LOADING");

  useEffect(() => {
    if (apiKey) {
      if (status === "WAITING") return;
      isApiKeyActive(instance, apiKey).then((active) => {
        setStatus(active ? "ACTIVE" : "WAITING");
        if (!active) {
          waitForApiKey(instance, apiKey).then((active) => {
            setStatus(active ? "ACTIVE" : "WAITING");
          });
        }
      });
    } else {
      setStatus("INITIAL");
    }
  }, [instance, apiKey, status]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <Label>API Connection</Label>
          {status === "WAITING" && (
            <>
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
              <code className="text-xs text-muted-foreground font-mono">
                {apiKey}
              </code>
            </>
          )}
        </div>
        {status === "INITIAL" ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              requestApiKey(instance).then((key) => {
                setData("apiKey", key);
              });
            }}
          >
            Request
          </Button>
        ) : (
          <Badge
            className={cn("flex-shrink-0", {
              "text-green-400": status === "ACTIVE",
              "text-yellow-500": status === "WAITING",
            })}
            variant="outline"
          >
            {status === "LOADING"
              ? "Loading..."
              : status === "WAITING"
              ? "Waiting for approval"
              : "Active"}
          </Badge>
        )}
      </div>
    </>
  );
};

export default ApiKey;
