"use client";

import { ServerApi } from "@/app/types/nezha-api";
import { Loader } from "@/components/loading/Loader";
import { Card, CardContent } from "@/components/ui/card";
import getEnv from "@/lib/env-entry";
import { formatBytes, nezhaFetcher } from "@/lib/utils";
import blogMan from "@/public/blog-man.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";
import useSWR from "swr";

export default function ServerOverviewClient() {
  const t = useTranslations("ServerOverviewClient");
  const { data, error, isLoading } = useSWR<ServerApi>(
    "/api/server",
    nezhaFetcher,
  );
  const disableCartoon = getEnv("NEXT_PUBLIC_DisableCartoon") === "true";
  const cartoonPictures = getEnv("NEXT_PUBLIC_CartoonPictures");

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-medium opacity-40">
          Error status:{error.status} {error.info?.cause ?? error.message}
        </p>
        <p className="text-sm font-medium opacity-40">{t("error_message")}</p>
      </div>
    );
  }

  return (
    <>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="px-6 py-3">
            <section className="flex flex-col gap-1">
              <p className="text-sm font-medium md:text-base">
                {t("p_816-881_Totalservers")}
              </p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                </span>
                {data?.result ? (
                  <div className="text-lg font-semibold">
                    {data?.result.length}
                  </div>
                ) : (
                  <div className="flex h-7 items-center">
                    <Loader visible={true} />
                  </div>
                )}
              </div>
            </section>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-6 py-3">
            <section className="flex flex-col gap-1">
              <p className="text-sm font-medium md:text-base">
                {t("p_1610-1676_Onlineservers")}
              </p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                {data?.result ? (
                  <div className="text-lg font-semibold">
                    {data?.live_servers}
                  </div>
                ) : (
                  <div className="flex h-7 items-center">
                    <Loader visible={true} />
                  </div>
                )}
              </div>
            </section>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-6 py-3">
            <section className="flex flex-col gap-1">
              <p className="text-sm font-medium md:text-base">
                {t("p_2532-2599_Offlineservers")}
              </p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
                {data?.result ? (
                  <div className="text-lg font-semibold">
                    {data?.offline_servers}
                  </div>
                ) : (
                  <div className="flex h-7 items-center">
                    <Loader visible={true} />
                  </div>
                )}
              </div>
            </section>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="relative px-6 py-3">
            <section className="flex flex-col gap-1">
              <p className="text-sm font-medium md:text-base">
                {t("p_3463-3530_Totalbandwidth")}
              </p>
              {data?.result ? (
                <section className="flex flex-col sm:flex-row pt-[8px] sm:items-center items-start gap-1">
                  <p className="text-[12px]  text-nowrap font-semibold">
                    ↑{formatBytes(data?.total_out_bandwidth)}
                  </p>
                  <p className="text-[12px] text-nowrap font-semibold">
                    ↓{formatBytes(data?.total_in_bandwidth)}
                  </p>
                </section>
              ) : (
                <div className="flex h-7 items-center">
                  <Loader visible={true} />
                </div>
              )}
            </section>
            {!disableCartoon && (
              <Image
                className="pointer-events-none absolute right-3 top-[-85px] z-10 w-20 scale-90 md:scale-100"
                alt={"Hamster1963"}
                width={80}
                height={100}
                unoptimized 
                src={cartoonPictures ? cartoonPictures : blogMan}
              />
            )}
          </CardContent>
        </Card>
      </section>
      {data?.result === undefined && !isLoading && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-medium opacity-40">{t("error_message")}</p>
        </div>
      )}
    </>
  );
}
