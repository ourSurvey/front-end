class SurveyService {
  async surveyDetail(id: number | string, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/survey/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json().then((data) => ({ data }));
  }
}

export default new SurveyService();
